import os
import requests
from django.conf import settings
from django.db import models
from .category import Category
from .subcategory import SubCategory
    
class Media(models.Model):
    media = models.FileField(upload_to='', default=None)
    image = models.URLField(blank=True, null=True)
    media_type = models.CharField(max_length=50,default=None, choices=[('image', 'Image (png, jpg, webp, gif)'), ('video', 'Video')])
    title = models.CharField(max_length=100)
    categories = models.ManyToManyField(Category, related_name='media', blank=True)
    subcategories = models.ManyToManyField(SubCategory, related_name='media', blank=True)

    REQUIRED_FIELDS = ['media', 'media_type', 'title', 'categories']

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
         # First, call the parent's save method to save the file locally
        super().save(*args, **kwargs)

        if self.media:
            # After the image is saved locally, send it to Node.js server
            old_image = self.image
            print(f"Image uploaded to Node.js server: {old_image}")
            self.image = self.upload_to_node()
            
            # If the file was uploaded successfully, delete the local file
            if self.media:
                self.delete_local_file()
                if old_image:
                    filename = old_image.split('/')[-1]
                    delete_url = f"{settings.MEDIA_SERVER_URL}/delete/media/{filename}"
                    requests.delete(delete_url)
                
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        print("Delete the image file from Node.js server when the record is deleted")
        if self.image:
            print("Extract the filename from the URL")
            filename = self.image.split('/')[-1]  # Get the file name from URL (e.g., '1746536961063.webp')
            delete_url = f'{settings.MEDIA_SERVER_URL}/delete/media/{filename}'  # Adjust the URL as per your Node server

            try:
                print("Send DELETE request to Node.js server to delete the file")
                response = requests.delete(delete_url)
                if response.status_code == 200:
                    print(f"Deleted {filename} from Node server")
                else:
                    print(f"Failed to delete {filename} from Node server")
            except Exception as e:
                print(f"Error deleting {filename} from Node server: {e}")
        
        super().delete(*args, **kwargs)  # Call the parent delete method

    def upload_to_node(self):
        """
        Send the image to Node.js server for storage and get back the file URL.
        """
        print("settings.MEDIA_SERVER_URL", settings.MEDIA_SERVER_URL);
        url = f'{settings.MEDIA_SERVER_URL}/upload/media'  # Node.js server URL
        files = {'media': open(self.media.path, 'rb')}
        
        try:
            response = requests.post(url, files=files)
            print('response.status_code', response.status_code)
            if response.status_code == 200:
                # Assume Node.js returns the file URL in the response
                return response.json().get('url')
            else:
                return None
        except requests.exceptions.RequestException as e:
            print(f"Error uploading image to Node.js: {e}")
            return None

    def delete_local_file(self):
        """
        Delete the local file after it has been successfully uploaded.
        """
        if os.path.exists(self.media.path):
            os.remove(self.media.path)
            print(f"Local file {self.media.path} deleted.")
        else:
            print(f"Local file {self.media.path} does not exist.")