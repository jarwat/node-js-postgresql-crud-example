pipeline {
    agent any

    environment {
        PROJECT_ID = 'molten-catalyst-422309-d9'
        CLUSTER_NAME = 'seedtest'
        ZONE = 'us-central1'
        branch = "${env.BRANCH_NAME}"
        VERSION = "${BUILD_NUMBER}"
    }
    stages {
        stage('Prepare param') {
            steps {
                //script{
                //    ssh"""

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
                    echo "PROJECT ID : ${PROJECT_ID}"
                    echo "CLUSTER_NAME : ${CLUSTER_NAME}"
                    echo "ZONE : ${ZONE}"
                    echo "environment : ${environment}"
                    echo "port : ${port}"
                //    """
                //}
            }
        }
        stage('Build') {
            steps {
                script{
                   ssh"""
                    echo "docker build -t seednakab/nodejs-postgres:test${VERSION} ."
                    echo "docker push seednakab/nodejs-postgres:test${VERSION}"
                   """
                }
            }
        }
        stage('Deploy') {
            steps {
                script{
                   ssh"""
                    dir("deployment"){
                    echo "git clone -b ${branch} https://github.com/jarwat/nodejs_postgressql_deployment.git"
                    echo "gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PROJECT_ID"
                    echo ""
                    echo "kubectl apply -f deployment_nodejs.yml"
                    """
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
        stage('create LB') {
            steps {
                script {
                    sh"""
                    echo "pod_name=\$(kubectl get pods -o=name | grep ${environment} | awk -F'/' '{print \$2}')" 
                    echo "gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PROJECT_ID"
                    #example
                    echo "kubectl expose pod nodejs-prod-5c8fdd9666-kx92n --type=LoadBalancer --port=${port} --target-port=8080"
                    #pod_name = "nodejs-prod-5c8fdd9666-kx92n"
                    #echo "kubectl expose pod ${pod_name} --type=LoadBalancer --port=${port} --target-port=8080"
                    """
                }
            }
        }
    }
}
