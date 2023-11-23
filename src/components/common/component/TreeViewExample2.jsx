import React, {useEffect, useState} from 'react';
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";

const TreeViewExample2 = () => {
    const folder = {
        name: "",
        id: 890,
        children: [
            {
                id: "data-string",
                name: "Fruits",
                children: [
                    { name: "Avocados", id: 690 },
                    { name: "Bananas", id: 1001 },
                    { name: "Berries", id: 793 },
                    { name: "Oranges", id: 18 },
                    { name: "Pears", id: 9990 },
                ],
            },
            {
                id: "one",
                name: "Drinks",
                children: [
                    { name: "Apple Juice", id: 7 },
                    { name: "Chocolate", id: 12 },
                    { name: "Coffee", id: 1 },
                    {
                        id: 908,
                        name: "Tea",
                        children: [
                            { name: "Black Tea", id: 923 },
                            { name: "Green Tea", id: 43 },
                            { name: "Red Tea", id: 23 },
                            { name: "Matcha", id: 4 },
                        ],
                    },
                ],
            },
            {
                id: 42,
                name: "Vegetables",
                children: [
                    { name: "Beets", id: 672 },
                    { name: "Carrots", id: 13 },
                    { name: "Celery", id: 123 },
                    { name: "Lettuce", id: 893 },
                    { name: "Onions", id: 82 },
                ],
            },
        ],
    }

    const data = flattenTree(folder);

    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        console.log('selectedIds', selectedIds)
        for(let key in selectedIds)
        {
            console.log(selectedIds[key])
        }
    }, [selectedIds]);

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            getAndSetIds();
        }
    };

    const getAndSetIds = () => {
        setSelectedIds(
            document
                .querySelector("#txtIdsToSelect")
                .value.split(",")
                .filter(val => !!val.trim())
                .map((x) => {
                    if (isNaN(parseInt(x.trim()))) {
                        return x;
                    }
                    return parseInt(x.trim());
                })
        );
    };

    const ArrowIcon = ({ isOpen, className }) => {
        const baseClass = "arrow";
        const classes = cx(
            baseClass,
            { [`${baseClass}--closed`]: !isOpen },
            { [`${baseClass}--open`]: isOpen },
            className
        );
        return <IoMdArrowDropright className={classes} />;
    };

    const CheckBoxIcon = ({ variant, ...rest }) => {
        switch (variant) {
            case "all":
                return <FaCheckSquare {...rest} />;
            case "none":
                return <FaSquare {...rest} />;
            case "some":
                return <FaMinusSquare {...rest} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div>
                <div>
                    <label htmlFor="txtIdsToSelect">
                        Comma-delimited list of IDs to set:
                    </label>
                    <input id="txtIdsToSelect" type="text" onKeyDown={onKeyDown} />
                    <button onClick={() => getAndSetIds()}>Set</button>
                </div>
                <div>
                    <button onClick={() => setSelectedIds([])}>Clear Selected Nodes</button>
                </div>
                <div className="checkbox">
                    <TreeView
                        data={data}
                        aria-label="Checkbox tree"
                        multiSelect
                        selectedIds={selectedIds}
                        defaultExpandedIds={[1]}
                        propagateSelect
                        propagateSelectUpwards
                        togglableSelect
                        onSelect={(props) => {
                            setSelectedIds(props?.treeState?.selectedIds);
                            // console.log('onSelect callback: ', props?.treeState?.selectedIds)
                            // console.log('onSelect callback single: ', props?.treeState?.selectedIds?.entries)
                        }}
                        // onNodeSelect={(props) => console.log('onNodeSelect callback: ', props)}
                        nodeRenderer={({
                                           element,
                                           isBranch,
                                           isExpanded,
                                           isSelected,
                                           isHalfSelected,
                                           isDisabled,
                                           getNodeProps,
                                           level,
                                           handleSelect,
                                           handleExpand,
                                       }) => {
                            return (
                                <div
                                    {...getNodeProps({ onClick: handleExpand })}
                                    style={{
                                        marginLeft: 40 * (level - 1),
                                        opacity: isDisabled ? 0.5 : 1,
                                    }}
                                >
                                    {isBranch && <ArrowIcon isOpen={isExpanded} />}
                                    <CheckBoxIcon
                                        className="checkbox-icon"
                                        onClick={(e) => {
                                            handleSelect(e);
                                            e.stopPropagation();
                                        }}
                                        variant={
                                            isHalfSelected ? "some" : isSelected ? "all" : "none"
                                        }
                                    />
                                    <span className="name">
                  {element.name}-{element.id}
                </span>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default TreeViewExample2;