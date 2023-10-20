import { useContext, useEffect, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import ExpenseForm from "../../components/forms/ExpenseForm.component";
import { useParams, useNavigate } from "react-router-dom";

const EditExpense = () => {
  return null
}

export default EditExpense;