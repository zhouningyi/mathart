function Particle(ctx, x, y) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.vx = 3.5 * (Math.random() - 0.5);
  this.vy = 3.5 * (Math.random() - 0.5);
  this.radius = 5 + Math.random() * 5;
  var k = 5.2; //密度
  this.m = this.radius * this.radius * Math.PI * k;// 质量 = 密度 * 面积
  this.color = 'rgba(0,'+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+',1)';
}

Particle.prototype.update = function (force) {
  var fx = force.x;//力在x上的分量
  var fy = force.y;//力在y上的分量
  var m = this.m;//获取质量
  var ax = fx / m;//获取x上的加速度
  var ay = fy / m;//获取y上的加速度
  this.vx = this.vx + ax;//对x上的速度进行更新
  this.vy = this.vy + ay;//对y上的速度进行更新
  this.x = this.x + this.vx;//对x上的位置进行更新
  this.y = this.y + this.vy;//对y上的位置进行更新
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