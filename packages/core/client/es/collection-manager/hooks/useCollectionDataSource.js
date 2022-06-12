import { action } from '@formily/reactive';
import { useCollectionManager } from ".";
import { useCompile } from "../../schema-component";
export function useCollectionDataSource() {
  return function (field) {
    var compile = useCompile();

    var _useCollectionManager = useCollectionManager(),
        _useCollectionManager2 = _useCollectionManager.collections,
        collections = _useCollectionManager2 === void 0 ? [] : _useCollectionManager2;

    action.bound(function (data) {
      field.dataSource = data.map(function (item) {
        return {
          label: compile(item.title),
          value: item.name
        };
      });
    })(collections);
  };
}