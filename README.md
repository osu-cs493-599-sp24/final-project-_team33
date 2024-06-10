# final-project-_team33


Kubernetes Step
1. Register a new account on GOOGLE Cloud Platform
2. Create a new project
3. Enable Kubernetes Engine API
4. Install Google Cloud SDK on your local machine (https://cloud.google.com/sdk/docs/install)
  - brew install google-cloud-sdk
  - gcloud --version
  - gcloud auth login
  - gcloud config set project [project-id]
5. Create a new Kubernetes cluster
  - gcloud container clusters create [cluster-name] --machine-type=e2-micro --zone-us-west1-a --num-nodes=2
  - gcloud container clusters get-credentials [cluster-name] --zone us-west1-a // to get the credentials for the cluster
