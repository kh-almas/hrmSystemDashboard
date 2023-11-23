import React from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import data from "./treedata.json";

const TreeViewExample = () => {
    const buildDirectoryTree = (categories) => {
        const directoryMap = new Map();
        const rootDirectories = [];

        categories.forEach((category) => {
            category.label = category?.name_s;
            directoryMap.set(category.id, category);
            category.children = [];
        });

        categories.forEach((category) => {
            if (category.parent_id) {
                const parent = directoryMap.get(category.parent_id);
                if (parent) {
                    parent.children.push(category);
                }
            } else {
                rootDirectories.push(category);
            }
        });

        return rootDirectories;
    };

    const inputData = [
        {
            "id": 1,
            "name_s": "category",
            "code_s": "cat_345",
            "company_name_s": "UL Group",
            "branch_name_s": "Bangladesh - Dhaka",
            "description_s": "description",
            "status_s": "Active",
            "parent_id": null,
            "parent_name_s_g": null,
            "pc_address": null
        },
        {
            "id": 2,
            "name_s": "category2",
            "code_s": "cat_345",
            "company_name_s": "UL Group",
            "branch_name_s": "Bangladesh - Dhaka",
            "description_s": "description",
            "status_s": "Active",
            "parent_id": 1,
            "parent_name_s_g": "category",
            "pc_address": null
        },
        {
            "id": 3,
            "name_s": "category3",
            "code_s": "cat_345",
            "company_name_s": "UL Group",
            "branch_name_s": "Bangladesh - Dhaka",
            "description_s": "description",
            "status_s": "Active",
            "parent_id": 1,
            "parent_name_s_g": "category",
            "pc_address": null
        }
    ];
    const outputData = buildDirectoryTree(inputData);
    console.log('outputData', outputData);

    const onChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
    }
    const onAction = (node, action) => {
        // console.log('onAction::', action, node)
    }
    const onNodeToggle = currentNode => {
        // console.log('onNodeToggle::', currentNode)
    }
    return (
        <>
            <DropdownTreeSelect data={outputData} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />,
        </>
    );
};

export default TreeViewExample;