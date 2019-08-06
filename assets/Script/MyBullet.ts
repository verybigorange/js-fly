const { ccclass, property } = cc._decorator;
import Pools from "./Pools";

@ccclass
export default class MyBullet extends cc.Component {
  @property(cc.SpriteFrame)
  frame: cc.SpriteFrame;

  private _speed: number = 12;
  private _isInit: boolean = false;
  private _x: number = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  update(dt) {
    if (!this._isInit) return;

    // 超出边界
    if (this.node.y >= cc.winSize.height / 2 + this.node.height / 2) {
      this._isInit = false;
      // 对象池回收节点
      Pools.MyBulletPool.put(this.node);
      return;
    }
    this.node.y += this._speed;
    this.node.x = this._x;
  }

  public init() {
    this._isInit = true;
    this._x = this.node.x;
  }

  public stopFly() {
    this._isInit = false;
  }

  // 子弹和敌人碰撞
  onCollisionEnter(other, self) {
    /** 子弹打中敌机 **/
    const bulletNode = self.node;

    const animation = bulletNode.getComponent(cc.Animation);
    const MyBulletScript = bulletNode.getComponent("MyBullet");
    MyBulletScript.stopFly();

    animation.on("finished", () => {
      // 爆炸后，还原子弹并回收
      bulletNode.getComponent(cc.Sprite).spriteFrame = MyBulletScript.frame;
      bulletNode.setScale(0.2);
      Pools.MyBulletPool.put(bulletNode);
    });
    animation.on("play", () => {
      // 增大爆炸效果
      bulletNode.setScale(0.8);
    })
    // 播放子弹集中动画
    animation.play();
  }
}
