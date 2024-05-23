import { Handle } from "react-flow-renderer";

import { FaCirclePlay } from "react-icons/fa6";

const StartNode = ({ data, isConnectable }) => {
    return (
        <div className="node node-start">
            <div>
                <strong><FaCirclePlay /></strong>
            </div>
            <Handle
                id="out"
                type="source"
                position="bottom"
                isConnectable={isConnectable}
            />
            
        </div>
    );
};

export default StartNode;