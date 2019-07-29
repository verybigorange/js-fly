const { ccclass, property } = cc._decorator;
import BulletPool from "BulletPool";

@ccclass
export default class Bullet extends cc.Component {
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
      BulletPool.put(this.node);
      return;
    }
    this.node.y += this._speed;
    this.node.x = this._x;
  }

  public init() {
    this._isInit = true;
    this._x = this.node.x;
  }
}
