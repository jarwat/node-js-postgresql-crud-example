pipeline {
    agent any

    environment {
        PROJECT_ID = 'molten-catalyst-422309-d9'
        CLUSTER_NAME = 'seedtest'
        ZONE = 'us-central1'
        branch = "${env.BRANCH_NAME}"
        VERSION = "${BUILD_NUMBER}"
    }
    stage('Prepare param') {
        steps {
            //script{
            //    ssh"""
                echo "PROJECT ID : ${PROJECT_ID}"
                echo "CLUSTER_NAME : ${CLUSTER_NAME}"
                echo "ZONE : ${ZONE}"
                script{
                    if ("${branch}" == "master"){
                        port = '3000'
                        environment = 'production'
                    } else{
                        port = '4000'
                        environment = 'staging'
                    }
                }
                //ls -la
                echo "environment : ${environment}"
                echo "port : ${port}"
            //    """
            //}
        }
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
                    echo "docker build -t seednakab/nodejs-postgres:test${VERSION} ."
                    echo "docker push seednakab/nodejs-postgres:test${VERSION}"
                //    """
                //}
            }
        }
        stage('Deploy') {
            steps {
                dir("deployment"){
                echo "git clone -b ${branch} https://github.com/jarwat/nodejs_postgressql_deployment.git"
                echo "gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PROJECT_ID"
                echo ""
                echo "kubectl apply -f deployment_nodejs.yml"
                }
            }
        }
        stage('hpa') {
            steps {
                dir("deployment"){
                echo "gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PROJECT_ID"
                echo "kubectl apply -f hpa.yml"
                }
            }
        }
    }
}
