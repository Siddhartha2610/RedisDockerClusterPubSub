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

const pub = new Redis.Cluster(nodes, {
	redisOptions:{
		scaleReads: "slave",
  },
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  reconnectOnError(err) {
    const targetError = "READONLY";
    if (err.message.includes(targetError)) {
      // Only reconnect when the error contains "READONLY"
      return true; // or `return 1;`
    }
  },
});

var adder = 1;
const channel = 'my_test_channel';

const sleep = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

async function main() {
    console.log('Started publisher...')
		while (true){
		var msg = 'greetings from publisher '+`${adder}`;
    	await sleep(5);
    	pub.publish(channel, msg, (error, count) => {
			    if (error) {
			        throw new Error(error);
			    }});
			console.log(`Published Message ${msg} on channel ${channel}`);
			adder++;
		}
}
main();
