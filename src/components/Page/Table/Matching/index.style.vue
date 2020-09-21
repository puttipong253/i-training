<script>
import styled from "vue-styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin: auto;
  text-align: center;
  .text-custom .v-input__slot::before {
      border-color: purple !important; 
      color: #ECB8F2 !important;
      font-size: 30px !important;
  }
  .v-text-field {
    padding-top: 12px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;
export const Content = styled.div`
  width: 100%;
  height: auto;
  margin: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
`;
export const Table1 = styled.div`
  width: 48%;
  height: auto;
  margin: auto;
`;

export default {};
</script>


