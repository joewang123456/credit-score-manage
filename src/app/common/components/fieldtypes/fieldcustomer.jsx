import React from 'react';
class FieldCustomer extends React.Component {
    render() {
        const ChildComponent = this.props.childComponent;
        return (
            <div>
                <ChildComponent {...this.props} />
            </div>
        )
    }
}

export default FieldCustomer;