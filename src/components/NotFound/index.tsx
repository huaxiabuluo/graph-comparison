import React from 'react';
import { Row, Col, Button } from 'antd';
import styles from './index.module.less';

export default function NotFound() {
  return (
    <Row className={styles.notFoundWrapper}>
      <Col span={12}>
        <div className={styles.icon} />
      </Col>
      <Col span={10} offset={2} className={styles.wrapperRignt}>
        <div className={styles.textWrapper}>
          <h1>404</h1>
          <div className={styles.desc}>抱歉，你访问的页面不存在</div>
          <div className={styles.actions}>
            <Button type="primary" onClick={() => {}}>
              返回首页
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
