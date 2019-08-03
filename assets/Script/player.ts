const { ccclass, property } = cc._decorator;
import Pools from "./Pools";

@ccclass
export default class Player extends cc.Component {
  @property(cc.Prefab)

  private _isUp: boolean = false;
  private _isDown: boolean = false;
  private _isLeft: boolean = false;
  private _isRight: boolean = false;
  private _isShoot: boolean = false;

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this._eventInit();
  }

  start() {}

  // 射击
  private _shoot() {
    const bullet = Pools.MyBulletPool.get();
    if (!cc.isValid(bullet)) return;

    const position = this.node.getPosition();
    position.y += this.node.height / 2 + 10;

    // 子弹位置
    bullet.setPosition(position);
    bullet.parent = cc.director.getScene().getChildByName("Canvas");

    const script = bullet.getComponent("MyBullet");
    cc.isValid(script) && script.init();
  }

  private _onkeyup(event) {
    const keyCode = event.keyCode;

    switch (keyCode) {
      // 空格
      case 32:
        this._shoot();
        break;
      case 40:
        this._isDown = false;
        break;
      case 38:
        this._isUp = false;
        break;
      case 37:
        this._isLeft = false;
        break;
      case 39:
        this._isRight = false;
        break;
    }
  }

  update(dt) {
    const position = this.node.getPosition();
    const base = 6; // 每次移动的距离
    const width = cc.winSize.width;
    const height = cc.winSize.height;

    if (this._isDown) {
      if (position.y <= -height / 2 + this.node.height / 2) return;
      const action = cc.moveBy(0.002, cc.v2(0, -base));
      action && this.node.runAction(action);
    }

    if (this._isUp) {
      if (position.y >= height / 2 - this.node.height / 2) return;
      const action = cc.moveBy(0.002, cc.v2(0, base));
      action && this.node.runAction(action);
    }

    if (this._isLeft) {
      if (position.x <= -width / 2 + this.node.width / 2) return;
      const action = cc.moveBy(0.002, cc.v2(-base, 0));
      action && this.node.runAction(action);
    }

    if (this._isRight) {
      if (position.x >= width / 2 - this.node.width / 2) return;
      const action = cc.moveBy(0.002, cc.v2(base, 0));
      action && this.node.runAction(action);
    }
  }

  private _eventInit() {
    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_DOWN,
      this._move,
      this
    );
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onkeyup, this);
  }

  // 移动
  private _move(event) {
    const keyCode = event.keyCode;

    // 超出边界，不做处理
    switch (keyCode) {
      case 40:
        this._isDown = true;
        break;
      case 38:
        this._isUp = true;
        break;
      case 37:
        this._isLeft = true;
        break;
      case 39:
        this._isRight = true;
        break;
    }
  }
}
