const { ccclass, property } = cc._decorator;
import { EnemyType } from "./model";
import enemyMar from "./enemyMar";

@ccclass
export default class Game extends cc.Component {
  onLoad() {
    // 开启碰撞检测
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;

    cc.game.setFrameRate(60);
    enemyMar.create(EnemyType.enemy1);
  }

  onCollisionEnter(other, self) {
    console.log(other,self)
  }
}
