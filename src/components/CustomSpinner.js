import React, { useState } from "react";
import { Triangle } from "react-loader-spinner";

const CustomSpinner = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#4fa94d");

  const override = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  const triangleContainerStyle = {
    marginTop: "150px", // Ajusta el valor del margen superior según tus preferencias
  };

  return (
    <div className="sweet-loading" style={{ height: "100vh", ...override }}>
      {/* button y Triangle son opcionales, dependiendo de si quieres tener un botón para mostrar/ocultar el spinner */}
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button> */}

      <div style={triangleContainerStyle}>
        <Triangle
          visible={true}
          height={100}
          width={100}
          color={'blue'}
          ariaLabel="triangle-loading"
          strokeWidth={8} // Ajusta el grosor de las líneas según tus preferencias
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default CustomSpinner;
