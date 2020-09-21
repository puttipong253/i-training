<script>
import styled from "vue-styled-components";

export const Wrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  height: auto;
  margin: auto;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  .custom-stepper .v-stepper__step__step {
    background-color: purple !important;
    border-color: purple !important;
}
`;
export const Header = styled.div`
  color: white;
  font-size: 16px;
  background-color: purple;
`;
export const Content = styled.div`
  /* margin-top: 150px;
  text-align: center;
  margin: auto; */
`;

export default {};
</script>


