<script>
import styled from "vue-styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  height: auto;
  margin: auto;
  text-align: center;
  .text-custom .v-input__slot::before {
      border-color: purple !important; 
      color: #ECB8F2 !important;
      font-size: 30px !important;
  }
  .text-custom label {
      font-size: 14px !important;
  }
  .v-text-field {
    margin: 0px !important;
  }
  .mdi-asterisk::before {
    font-size:7px;
  }
  }
`;
export const Header = styled.div`
  color: white;
  font-size: 17px;
  margin-bottom: 10px;
  background-color: purple;
  padding-top: 2px;
  height: 30px;
`;

export default {};
</script>


