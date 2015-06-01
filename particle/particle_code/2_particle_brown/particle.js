function Particle(ctx, x, y) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.vx = Math.random() - 0.5; //x速度随机
  this.vy = Math.random() - 0.5; //y速度随机
  this.radius = Math.random() * 5;
  this.color = 'rgba(0,0,0,0.8)';
}

Particle.prototype.update = function () {
  this.vx += 0.2 * (Math.random() - 0.5);//新加的代码
  this.vy += 0.2 * (Math.random() - 0.5);//新加的代码
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;
};

Particle.prototype.render = function () {
  var ctx = this.ctx;
  var radius = this.radius;//粒子的半径
  ctx.beginPath();//开始画图
  ctx.fillStyle = this.color;//设置填充色
  ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);//画一个圆形 canvas的圆是由弧线命令完成的。
  ctx.fill();//填颜色
  ctx.closePath();//结束绘图
};