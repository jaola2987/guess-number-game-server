import { OnModuleInit } from '@nestjs/common'
import {
	SubscribeMessage,
	WebSocketGateway,
	MessageBody,
	WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000']
	}
})
export class EventsGateway implements OnModuleInit {
	@WebSocketServer()
	server: Server

	onModuleInit() {
		this.server.on('connection', (socket) => {
			console.log(socket.id)
			console.log('connect')
		})
	}

	@SubscribeMessage('newMessage')
	onNewMessage(@MessageBody() body: any) {
		this.server.emit('onMessage', {
			msg: 'New Message',
			content: body
		})
	}
}
