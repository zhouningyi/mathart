function Particle(ctx, x, y) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.vx = 0.5 * (Math.random() - 0.5);
  this.vy = 0.5 * (Math.random() - 0.5);
  this.radius = Math.random() * 15;
  var k = 2;// 密度
  this.m = this.radius * this.radius * Math.PI * k;// 质量 = 密度 * 面积
  this.color = 'rgba(0,0,0,0.3)';
}

Particle.prototype.update = function () {
  var p = 15;//获得动量的大小
  var phi = Math.random() * Math.PI * 2;//动量的方向
  var dv = p / this.m;//改变速度的大小
  this.vx += dv * Math.cos(phi);//对现在的x速度进行更新
  this.vy += dv * Math.sin(phi);//对现在的y速度进行更新
  this.x = this.x + this.vx + (Math.random() - 0.5) * 13;
  this.y = this.y + this.vy + (Math.random() - 0.5) * 13;
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