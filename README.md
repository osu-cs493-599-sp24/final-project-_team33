# final-project-_team33


#Deployment Step

#Set up Kubernetes cluster Step
1. Register a new account on GOOGLE Cloud Platform
2. Create a new project
3. Enable Kubernetes Engine API
4. Install Google Cloud SDK on your local machine (https://cloud.google.com/sdk/docs/install)
  - brew install google-cloud-sdk // install google cli
  - gcloud --version // check google cloud version
  - gcloud auth login // login gcloud by your account
  - gcloud config set project [project-id]
5. Create a new Kubernetes cluster
  - gcloud container clusters create [cluster-name] --machine-type=e2-micro --zone-us-west1-a --num-nodes=2
  - gcloud container clusters get-credentials [cluster-name] --zone us-west1-a // to get the credentials for the cluster

##Set Up Mongo Kubernetes
1. create secret file ./deployments/mongo/secret.yaml
  - encode value as base64 (echo -n 'xxxxxxxx' | base64)
  - kubectl apply -f ./deployments/mongo-secret.yaml
  - kubectl get secrets // to check the secret {secret name from metadata name}
2. create deployment file ./deployments/mongo-deployment.yaml
  - kubectl apply -f ./deployments/mongo/deployment.yaml
  - kubectl get pods // to check the pod
3. create service file ./deployments/mongo/service.yml
  - kubectl apply -f ./deployments/mongo/service.yaml
  - kubectl get services // to check the service that we open port 27017
4. testing connect to mongodb
  - kubectl get services // to get all service and port of all services
  - kubectl port-forward service/mongodb-service 27017:27017 // [local:remote-service-port] to forward port

##Set Up Redis  Kubernetes
1. create deployment file ./deployments/redis/deployment.yaml
  - kubectl apply -f ./deployments/redis/deployment.yaml
  - kubectl get pods // to check the pod
2. create service file ./deployments/redis/service.yml
  - kubectl apply -f ./deployments/redis/service.yaml
  - kubectl get services // to check the service that we open port 6379
3. testing connect to redis
  - kubectl get services // to get all service and port of all services
  - kubectl port-forward service/redis-service 6379:6379 // [local:remote-service-port] to forward port


connect to mongodb
docker exec -it [docker id] mongo
use tarpaulin"
db.auth("userteam33", "passwordteam33")