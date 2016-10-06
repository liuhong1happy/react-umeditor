# 开发文档

本节内容介绍如何加入开发，了解源码背后的结构和原理。

## 1. 第一步：了解源码结构

为了能理解如何做到了解源码结构，首先列出源码目录及其说明。

#### **1.1. 源码目录**

- less **样式目录**
    - `editor.less`
- src **源码目录**
    - components **控件**
        - base **基础组件**
            - `ComboBox.react.js` **组合框**
            - `Dialog.react.js` **对话框**
            - `Dropdown.react.js` **下拉框**
            - `TabGroup.react.js` **Tab页**
        - core **核心组件**
            - `EditorContentEditableDiv.react.js` **可编辑区域**
            - `EditorIcon.react.js` **按钮**
            - `EditorTextArea.react.js` **源码显示区域**
            - `EditorToolbar.react.js` **工具条**
        - plugins **插件**
            - `ColorDropdown.react.js` **颜色选择**
            - `EmotionDialog.react.js` **表情对话框**
            - `FontFamilyComboBox.react.js` **字体选择**
            - `FontSizeComboBox.react.js` **字号选择**
            - `FormulaDropdown.react.js` **公式选择**
            - `ImageDialog.react.js` **图片对话框**
            - `ParagraphComboBox.react.js` **段落选择**
            - `SpecialCharsDialog.react.js` **特殊字符对话框**
            - `TablePickerDropdown.react.js` **表格行列数选择**
    - constants **常量**
        - `EditorConstants.js` **常量**
    - `editor.js` **编辑器入口**
    - utils **工具集合**
        - `EditorDOM.js` **DOM操作**
        - `EditorEventEmitter.js` **加载调度器**
        - `EditorHistory.js` **历史记录**
        - `EditorResize.react.js` **修改图片大小**
        - `EditorSelection.js` **Selection\Range封装**
        - `EditorTimer.js` **定时器**
        - `FileUpload.js` **文件上传**
        - `QiniuUtils.js` **七牛组件**
        

#### **1.2. 源码结构**

1. 其结构清晰，其核心代码放置在同一个文件夹下`src/components/core`，同时绝大部分调度逻辑放置在`src/editor.js`中。

2. 工具类和插件类，放置合理，便于查找和修改，工具目录`src/utils`，插件目录`src/components/plugins`。

3. 所有插件或者核心代码的常量放置在`src/constants/EditorConstants.js`文件中。

4. 目前所有样式，均放置在`less/editor.less`，待合理优化目录组织结构。

## 2. 第二步：了解源码原理

整个编辑器采用React基础组件布局，包括工具条和编辑区。其中，工具条包含很多可选功能按钮；编辑区可以编辑内容，也可以编辑源码。

编辑器采用Selection、Range等光标操作，通过execCommand来执行一些浏览器支持的编辑命令，通过借助`inserthtml`（实际实现有差异）等命令来实现其他插入功能。

## 3. 第三步：快速加入开发

1. 如果不会使用github，请了解github如何使用。
2. 请联系[liuhong1happy](mailto:liuhong1.happy@163.com)，将你加入`Collaborators`。
3. 如果是在特定分支修改，请checkout到特定分支，如需合并到develop分支请联系[liuhong1happy](mailto:liuhong1.happy@163.com)。
4. 如果你需要新增特定特性，请从最新develop分支上创建特性分支，待测试通过后提交到develop分支。

## 4. 第四步：版本命名

1. A.B.C 的方式命名，[A][B][C]均为数字
2. [A]为主版本号，代码做出重大调整时修改
3. [B]为次版本号，功能作细微调整或者加入部分新功能时修改
4. [C]为次版本中更新迭代代号，最新表示次版本号中功能更加稳定

## 5. 第五步：组件发布

1. 为了区分稳定版、开发版，请在实际更新版本代号时，如果是开发版请将版本号命名为 `A.B.C.rc-x`，其中x为相应数字，待开发版稳定后，去掉`.rc-x`。
2. 目前需要nodejs组件用户才能发布，如需申请开辟组件发布权限，请联系[liuhong1happy](mailto:liuhong1.happy@163.com)。
