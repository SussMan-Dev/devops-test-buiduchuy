pipeline {
    agent any

    tools {
        nodejs 'NodeJS 24.21.0'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source...'
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Netlify...'

                withCredentials([
                    string(
                        credentialsId: 'netlify-token',
                        variable: 'NETLIFY_AUTH_TOKEN'
                    )
                ]) {
                    bat 'npx netlify deploy --prod --dir=dist --auth %NETLIFY_AUTH_TOKEN%'
                }
            }
        }
    }

    post {
        success {
            echo 'DEPLOY SUCCESS'
        }

        failure {
            echo 'DEPLOY FAILED'
        }
    }
}