import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/cognito-auth/Login";
import Signup from "../components/cognito-auth/Signup";
import {
  Dashboard,
  ViewProgram,
  ViewSessions,
  ClientInsert,
  CreateProgram,
  ViewGoals,
  UpdateGoal,
} from "../pages";
import NotFound from "../components/cognito-auth/NotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/">
        <Dashboard />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/dashboard">
        <Dashboard />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/sessions">
        <ViewSessions />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/program">
        <ViewProgram />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/program/create">
        <CreateProgram />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/add-client">
        <ClientInsert />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/goals">
        <ViewGoals />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/goal-edit">
        <UpdateGoal />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
