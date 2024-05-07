pipeline {
    agent any

    environment {
        PROJECT_ID = 'molten-catalyst-422309-d9'
        CLUSTER_NAME = 'seedtest'
        ZONE = 'us-central1'
    }

    stages {
        stage('Build') {
            steps {
                //script{
                //    ssh"""
                    echo "PROJECT ID : ${PROJECT_ID}"
                    echo "CLUSTER_NAME : ${CLUSTER_NAME}"
                    echo "ZONE : ${ZONE}"
                    //ls -la
                    echo "docker build -t seednakab/nodejs-postgres:test${BUILD_NUMBER} ."
                    echo "docker push seednakab/nodejs-postgres:test${BUILD_NUMBER}"
                //    """
                //}
            }
        }
        stage('Deploy') {
            steps {
                dir(deployment){
                echo "gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PROJECT_ID"
                echo "kubectl apply deployment_nodejs.yml"
                }
            }
        }
        stage('hpa') {
            steps {
                dir(deployment){
                echo "gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PROJECT_ID"
                echo "kubectl apply hpa.yml"
                }
            }
        }
    }
}
