function checkAccess(pcode: string) {
    return (target: any, key: string, desc: PropertyDescriptor) => {
        const method = desc.value;
        console.log('hello')
    };
}
