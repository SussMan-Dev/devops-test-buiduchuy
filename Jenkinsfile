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
                echo 'Deploying project...'
                bat 'echo Deploy step'
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