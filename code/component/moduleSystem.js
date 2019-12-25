// 局部注册
// ComponentB文件引入ComponentA和ComponentC
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
    components: {
        ComponentA,
        ComponentC
    }
}


//基础组件的自动化全局注册
//幸好如果你使用了 webpack (或在内部使用了 webpack 的 Vue CLI 3+)，
//那么就可以使用 require.context 只全局注册这些非常通用的基础组件。
//这里有一份可以让你在应用入口文件 (比如 src/main.js) 中全局导入基础组件的示例代码：
import Vue from 'Vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
    //组件目录的相对路径
    './components',
    //是否查询子目录
    false,
    //文件名称正则校验
    /Base\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
    //获取组件配置
    const componentConfig = requireComponent(fileName);
    
    //获取组件的 PascalCase 命名
    const componentName  = upperFirst(camelCase(
        fileName.split('/').pop().replace(/\.\w+$/, '')
    ));

    Vue.component(componentName, componentConfig.default || componentConfig);
});
