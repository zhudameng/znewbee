import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { useFormLayout } from '@formily/antd';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { isValid } from '@formily/shared';
import { Button, Input, Popover } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hasIcon, Icon, icons } from '../../../icon';

function IconField(props: any) {
  const layout = useFormLayout();
  const { value, onChange, disabled } = props;
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  return (
    <div>
      <Input.Group compact>
        <Popover
          placement={'bottom'}
          visible={visible}
          onVisibleChange={(val) => {
            if (disabled) {
              return;
            }
            setVisible(val);
          }}
          content={
            <div style={{ width: '26em', maxHeight: '20em', overflowY: 'auto' }}>
              {[...icons.keys()].map((key) => (
                <span
                  style={{ fontSize: 18, marginRight: 10, cursor: 'pointer' }}
                  onClick={() => {
                    onChange(key);
                    setVisible(false);
                  }}
                >
                  <Icon type={key} />
                </span>
              ))}
            </div>
          }
          title={t('Icon')}
          trigger="click"
        >
          <Button size={layout.size as any} disabled={disabled}>
            {hasIcon(value) ? <Icon type={value} /> : t('Select icon')}
          </Button>
        </Popover>
        {value && !disabled && (
          <Button
            size={layout.size as any}
            icon={<CloseOutlined />}
            onClick={(e) => {
              onChange(null);
            }}
          ></Button>
        )}
      </Input.Group>
    </div>
  );
}

export const IconPicker = connect(
  IconField,
  mapProps((props, field) => {
    return {
      ...props,
      suffix: <span>{field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffix}</span>,
    };
  }),
  mapReadPretty((props) => {
    if (!isValid(props.value)) {
      return <div></div>;
    }
    return <Icon type={props.value} />;
  }),
);

export default IconPicker;
