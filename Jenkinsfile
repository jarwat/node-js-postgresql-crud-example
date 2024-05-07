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
                script{
                    ssh"""
                    echo "PROJECT ID : ${PROJECT_ID}"
                    echo "CLUSTER_NAME : ${CLUSTER_NAME}"
                    echo "ZONE : ${ZONE}"
                    ls -la
                    echo "docker build -t seednakab/nodejs-postgres:test${BUILD_NUMBER} ."
                    echo "docker push seednakab/nodejs-postgres:test${BUILD_NUMBER}"
                    """
                }
            }
        }
        stage('Test') {
            steps {
                script{
                // Your test steps here
                    ssh"""
                    echo "test"
                    """
                }
            }
        }
        // stage('Deploy') {
        //     steps {
        //         script {
        //             docker.build('your-image-name')
        //             docker.withRegistry('https://gcr.io', 'gcr-credentials') {
        //                 docker.image('your-image-name').push('latest')
        //             }
        //             sh "gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PROJECT_ID"
        //             sh "kubectl set image deployment/your-deployment-name your-container-name=gcr.io/$PROJECT_ID/your-image-name:latest"
        //         }
        //     }
        // }
    }
}
