def sendTelegram(String message) {

    withCredentials([
        string(
            credentialsId: 'telegram-token',
            variable: 'BOT_TOKEN'
        ),
        string(
            credentialsId: 'telegram-chat-id',
            variable: 'CHAT_ID'
        )
    ]) {

        withEnv(["TELEGRAM_MESSAGE=${message}"]) {
            bat '''
                curl -s -X POST "https://api.telegram.org/bot%BOT_TOKEN%/sendMessage" ^
                -d chat_id="%CHAT_ID%" ^
                --data-urlencode "text=%TELEGRAM_MESSAGE%"
            '''
        }
    }
}

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

                script {
                    sendTelegram(
                        """🚀 DEPLOY STARTED
Project: devops-test
Branch: main"""
                    )
                }

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
            script {
                sendTelegram(
                    """✅ DEPLOY SUCCESS
Project: devops-test
Branch: main
URL: https://thriving-gingersnap-8087ee.netlify.app/"""
                )
            }
        }

        failure {
            script {
                sendTelegram(
                    """❌ DEPLOY FAILED
Project: devops-test
Branch: main
Please check Jenkins."""
                )
            }
        }
    }
}