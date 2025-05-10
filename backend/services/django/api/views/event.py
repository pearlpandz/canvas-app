from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.reverse import reverse
from datetime import datetime

from api.models.event import Event

class EventViewSet(ViewSet):
    def list(self, request):
        return Response({
            'event_by_date': request.build_absolute_uri(reverse('event-event_by_date', kwargs={'date': '24-04-2025'}, request=request)),
        })

    @action(detail=False, methods=['get'], url_path=r'(?P<date>\d{2}-\d{2}-\d{4})', url_name='event_by_date')
    def event_by_date(self, request, date):
        try:
            # Try parsing the date in both formats
            try:
                parsed_date = datetime.strptime(date, '%d/%m/%Y').date()
            except ValueError:
                parsed_date = datetime.strptime(date, '%d-%m-%Y').date()

            # Fetch events for the given date
            events = Event.objects.filter(date=parsed_date)
            event_list = []

            for event in events:
                media = event.events.all()
                event_list.append({
                    'id': event.id,
                    'name': event.name,
                    'date': event.date,
                    'media': [
                        {
                            'id': m.id,
                            'url': m.image,
                            'type': m.media_type
                        } for m in media
                    ]
                })

            return Response(event_list)
        except ValueError:
            return Response({'error': 'Invalid date format. Use dd/mm/yyyy or dd-mm-yyyy.'}, status=400)
