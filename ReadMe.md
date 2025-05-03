Phase 1
-------
Demo-1 (29/03)
    Initial POC

Demo-2 (12/04)
    Regular (2) - take it from ref site
    Product (2) - take it from ref site
    Political (2) - take it from ref site
    user can select theme color, that will apply in the frame
    dynamically onboarded frames (localstorage)

Demo-3 
    dynamically onboarded frames from microservices (mongodb)
    With Backend and uat environement (django with postgresql)
        no scope for users onboarding
        adding different categories and that images 
            schema(category, image, date)

Demo 4
    Festival Calendar
    user signup
    signin
    prepare documentation to load new frames into the site by admin (But need css developer help to load the css)


Demo nth

User Onboarding
    - with preloaded frames  
    - Different Subscripton (silver, gold, platinum, diamon)
    - Roles (user, reseller, distributor, master distributor, designers, employees, admin)

Phase 2
Custom > only web version


Stacks
------
> React Js: (FrontEnd)
> Database: (MongoDB, PostgreSQL)
> Github: (Private repostory)
> Server: AWS 
> Architecture: (Backend: Microservices, Frontend: monolith)
> Deployment: Github Actions -> Docker Container -> EC2
> Media storage: S3 bucket

Github - personal access tokens
-------------------------------
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

echo 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 | docker login ghcr.io -u pearlpandz --password-stdin