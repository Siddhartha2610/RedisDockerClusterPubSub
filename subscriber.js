const Redis = require('ioredis');
const nodes = [
	{
		port: 7001,
		host: "10.1.0.11"
	},
	{
		port: 7002,
		host: "10.1.0.12"
	},
	{
		port: 7003,
		host: "10.1.0.13"
	},
	{
		port: 7004,
		host: "10.1.0.14"
	},
	{
		port: 7005,
		host: "10.1.0.15"
	},
	{
		port: 7006,
		host: "10.1.0.16"
	},
]

const sub = new Redis.Cluster(nodes);

sub.on('message', (channel, message) => {
    console.log(`Received the message from ${channel}: ${message}`);
});

const channel = 'my_test_channel';

sub.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
});