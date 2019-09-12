import * as React from "react";
import { Form, IFields, required, maxLength } from "../Form/Form";
import { Field } from "../Form/Field";

const CropsForm: React.SFC = () => {

  //fieldName must match with fieldId
  const fields: IFields = {
    name: {
      id: "name",
      label: "Nombre",
      validation: {rule: required}
    },
    description: {
      id:"description",
      label: "Descripcion",
      editor: "multilinetextbox",
      validation: {rule: maxLength, args:200}
    }
  };
  
  
  return (
    <Form
      action='http://localhost:8080/bush/cultivo/insertar'
      fields = {fields}
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Ingresa los datos del nuevo cultivo
          </div>
          <Field {...fields.name}/>
          <Field {...fields.description}/>
        </React.Fragment>
      )}
    />
  );
};

export default CropsForm;

/*
@Controller
@RequestMapping("/bush")
public class CropController {

    @RequestMapping(value = "/cultivos/insertar", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<String> saveCrop(@RequestParam String cropName, @RequestParam String cropDescription) throws SQLException {
        CropDao cropDao = new CropDao(PostgresConnector.getInstance().getConnection());

        cropDao.insertCrop(cropName, cropDescription);

        return new ResponseEntity<>("Cultivo Creado", HttpStatus.OK);
    }
*/