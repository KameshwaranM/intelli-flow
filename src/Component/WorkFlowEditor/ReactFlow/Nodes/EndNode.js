import { Handle } from "react-flow-renderer";

import { FaCircleStop } from "react-icons/fa6";

const StartCustomNode = ({ data, isConnectable }) => {
    return (
        <div className="node node-end">
            <div>
                <strong><FaCircleStop /></strong>
            </div>
            <Handle
                id="in"
                type="target"
                position="top"
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default StartCustomNode;