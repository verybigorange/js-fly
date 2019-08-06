import Pools from "./Pools";
import { EnemyType } from "./model";
import Global from "./utils/Global";

class EnemyMar {
  // 创建一个敌人node
  create(type: EnemyType) {
    cc.loader.loadRes(
      `texture/enemy/enemy${type + 1}`,
      cc.SpriteFrame,
      (err, frame) => {
        if (err) {
          cc.log(`资源加载失败：${err}`);
          return;
        }
        cc.log(`敌人资源加载成功`);

        const enemyNode = Pools.EnemyPool.get();
        const sprite = enemyNode.getComponent(cc.Sprite);
        sprite.spriteFrame = frame;
        Global.getCanvas().addChild(enemyNode);
      }
    );
  }
}

export default new EnemyMar();
