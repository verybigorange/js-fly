const { ccclass, property } = cc._decorator;
import BulletPool from 'BulletPool';

@ccclass
export default class Player extends cc.Component {
  @property(cc.Prefab)
  bullet1: cc.Prefab = null;

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this._eventInit();
    BulletPool.init(this.bullet1);
  }

  start() {}

  // 射击   
  private _shoot() {
    const bullet = BulletPool.get();
    if (!cc.isValid(bullet)) return;

    const position = this.node.getPosition();
    position.y += this.node.height / 2 + 10;

    // 子弹位置
    bullet.setPosition(position);
    bullet.parent = cc.director.getScene().getChildByName("Canvas");

    const script = bullet.getComponent("bullet");
    cc.isValid(script) && script.init();
  }

  private _onkeyup(event) {
    const keyCode = event.keyCode;

    switch (keyCode) {
      // 空格
      case 32:
        this._shoot();
        break;
    }
  }

  // update (dt) {}

  private _eventInit() {
    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_DOWN,
      this._handlePosition,
      this
    );
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onkeyup, this);
  }

  private _handlePosition(event) {
    const width = cc.winSize.width;
    const height = cc.winSize.height;

    const keyCode = event.keyCode;
    const position = this.node.getPosition();
    const base = 15; // 每次移动的距离
    let action;

    this.node.stopAllActions();

    // 超出边界，不做处理
    switch (keyCode) {
      case 40:
        if (position.y <= -height / 2 + this.node.height / 2) return;
        action = cc.moveBy(0.002, cc.v2(0, -base));
        break;
      case 38:
        if (position.y >= height / 2 - this.node.height / 2) return;
        action = cc.moveBy(0.002, cc.v2(0, base));
        break;
      case 37:
        if (position.x <= -width / 2 + this.node.width / 2) return;
        action = cc.moveBy(0.002, cc.v2(-base, 0));
        break;
      case 39:
        if (position.x >= width / 2 - this.node.width / 2) return;
        action = cc.moveBy(0.002, cc.v2(base, 0));
        break;
    }

    action && this.node.runAction(action);
  }
}
