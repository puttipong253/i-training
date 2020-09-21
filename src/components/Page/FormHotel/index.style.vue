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
  .mdi-exclamation-thick::before {
    margin-top: 19px;
}
  .v-card__text {
    color: red !important;
    font-size: 18px;
  }
  .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
`;
export const Header = styled.div`
  color: white;
  font-size: 16px;
  background-color: purple;
`;

export default {};
</script>


