import { useGlobal } from "../contexts/GlobalContext";
import { InputNama, InputTimbangan } from "../componens/Inputan";
import Output from "../componens/Output";
import Saklar from "../componens/Saklar";
function Main() {
  const { timbanganList } = useGlobal();
  return (
    <>
      <h1 className="text-center">pencatuan</h1>
      <Saklar />
      <br />
      <InputNama />
      <br />
      <p className="text-center fst-italic">catatan timbangan:</p>
      <p className="text-center text-lg">
        {timbanganList.length === 0 ? "???" : timbanganList.join("+")}
      </p>
      <br />
      <InputTimbangan />
      <br />
      <Output />
    </>
  );
}
export default Main;
