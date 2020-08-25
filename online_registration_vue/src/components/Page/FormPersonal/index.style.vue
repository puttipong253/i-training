<script>
import styled from "vue-styled-components";

export const Wrapper = styled.div`
  width: 90%;
  max-width: 900px;
  height: auto;
  margin: auto;
  text-align: center;
  /* border:solid 1px blue; */
  margin-top: 20px;
  margin-bottom: 20px;
  .text-custom .v-input__slot::before {
      border-color: purple !important; {
      color: #ECB8F2 !important;
      font-size: 30px !important;
    }
  }
  .text-custom label {
      font-size: 14px !important;
    }
  }
`;
export const Header = styled.div`
  color: white;
  font-size: 17px;
  margin-bottom: 20px;
  background-color: purple;
  padding-top: 6px;
  height: 38px;
`;
export const ContentWrapper = styled.div`
  margin: auto;
  /* border:solid 1px green; */
  margin-bottom: 20px;
  margin-top: 20px;
`;

export default {};
</script>


