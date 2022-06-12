export var string = [{
  label: '{{t("contains")}}',
  value: '$includes',
  selected: true
}, {
  label: '{{t("does not contain")}}',
  value: '$notIncludes'
}, {
  label: '{{t("is")}}',
  value: '$eq'
}, {
  label: '{{t("is not")}}',
  value: '$ne'
}, {
  label: '{{t("is empty")}}',
  value: '$empty',
  noValue: true
}, {
  label: '{{t("is not empty")}}',
  value: '$notEmpty',
  noValue: true
}];
export var array = [{
  label: '{{t("is")}}',
  value: '$match',
  selected: true,
  schema: {
    'x-component': 'Select',
    'x-component-props': {
      mode: 'tags'
    }
  }
}, {
  label: '{{t("is not")}}',
  value: '$notMatch',
  schema: {
    'x-component': 'Select',
    'x-component-props': {
      mode: 'tags'
    }
  }
}, {
  label: '{{t("contains")}}',
  value: '$anyOf',
  schema: {
    'x-component': 'Select',
    'x-component-props': {
      mode: 'tags'
    }
  }
}, {
  label: '{{t("does not contain")}}',
  value: '$noneOf',
  schema: {
    'x-component': 'Select',
    'x-component-props': {
      mode: 'tags'
    }
  }
}, {
  label: '{{t("is empty")}}',
  value: '$empty',
  noValue: true
}, {
  label: '{{t("is not empty")}}',
  value: '$notEmpty',
  noValue: true
}];
export var datetime = [{
  label: "{{ t('is') }}",
  value: '$dateOn',
  selected: true
}, {
  label: "{{ t('is not') }}",
  value: '$dateNotOn'
}, {
  label: "{{ t('is before') }}",
  value: '$dateBefore'
}, {
  label: "{{ t('is after') }}",
  value: '$dateAfter'
}, {
  label: "{{ t('is on or after') }}",
  value: '$dateNotBefore'
}, {
  label: "{{ t('is on or before') }}",
  value: '$dateNotAfter'
}, {
  label: "{{ t('is empty') }}",
  value: '$null',
  noValue: true
}, {
  label: "{{ t('is not empty') }}",
  value: '$notNull',
  noValue: true
}];
export var number = [{
  label: '{{t("=")}}',
  value: '$eq',
  selected: true
}, {
  label: '{{t("≠")}}',
  value: '$ne'
}, {
  label: '{{t(">")}}',
  value: '$gt'
}, {
  label: '{{t("≥")}}',
  value: '$gte'
}, {
  label: '{{t("<")}}',
  value: '$lt'
}, {
  label: '{{t("≤")}}',
  value: '$lte'
}, {
  label: '{{t("is empty")}}',
  value: '$empty',
  noValue: true
}, {
  label: '{{t("is not empty")}}',
  value: '$notEmpty',
  noValue: true
}];
export var id = [{
  label: '{{t("is")}}',
  value: '$eq',
  selected: true
}, {
  label: '{{t("is not")}}',
  value: '$ne'
}, {
  label: '{{t("is current logged-in user")}}',
  value: '$isCurrentUser',
  noValue: true,
  visible: function visible(field) {
    return field.collectionName === 'users';
  }
}, {
  label: '{{t("exists")}}',
  value: '$exists',
  noValue: true
}, {
  label: '{{t("not exists")}}',
  value: '$notExists',
  noValue: true
}];
export var enumType = [{
  label: '{{t("is")}}',
  value: '$eq',
  selected: true,
  schema: {
    'x-component': 'Select'
  }
}, {
  label: '{{t("is not")}}',
  value: '$ne',
  schema: {
    'x-component': 'Select'
  }
}, {
  label: '{{t("contains")}}',
  value: '$in',
  schema: {
    'x-component': 'Select',
    'x-component-props': {
      mode: 'tags'
    }
  }
}, {
  label: '{{t("does not contain")}}',
  value: '$notIn',
  schema: {
    'x-component': 'Select',
    'x-component-props': {
      mode: 'tags'
    }
  }
}, {
  label: '{{t("is empty")}}',
  value: '$empty',
  noValue: true
}, {
  label: '{{t("is not empty")}}',
  value: '$notEmpty',
  noValue: true
}];
export var time = [{
  label: '{{t("is")}}',
  value: '$eq',
  selected: true
}, {
  label: '{{t("is not")}}',
  value: '$neq'
}, {
  label: '{{t("is empty")}}',
  value: '$null',
  noValue: true
}, {
  label: '{{t("is not empty")}}',
  value: '$notNull',
  noValue: true
}];
export var boolean = [{
  label: '{{t("Yes")}}',
  value: '$isTruly',
  selected: true,
  noValue: true
}, {
  label: '{{t("No")}}',
  value: '$isFalsy',
  noValue: true
}];