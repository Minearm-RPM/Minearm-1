const ssh = require('ssh2');

const conn = new ssh.Client();
conn.on('ready', () => {
  console.log('SSH连接已建立');

  conn.exec('ls', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log(`命令执行完成，返回代码：{code}`);
      conn.end();
    }).on('data', (data) => {
      console.log(`命令输出：{data}`);
    }).stderr.on('data', (data) => {
      console.error(`命令错误输出：${data}`);
    });
  });
}).connect({
  host: 'remote-server-ip',
  port: 22,
  username: 'username',
  password: 'password'
});
