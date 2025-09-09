export const Lights = () => {
    return (
        <>
            <ambientLight />
            <spotLight penumbra={0.5} position={[10, 10, 5]} castShadow={true} />
        </>
    );
}