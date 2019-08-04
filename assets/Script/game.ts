const { ccclass, property } = cc._decorator;
import { EnemyType } from "./model";
import enemyMar from "./enemyMar";

@ccclass
export default class Game extends cc.Component {
  onLoad() {
    cc.game.setFrameRate(60);
    enemyMar.create(EnemyType.enemy1);
  }
}
