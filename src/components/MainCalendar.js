import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  AllDayPanel,
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Toolbar,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { owners } from "../pages/demo-data/tasks";
import { appointments, cathegoryData } from "../pages/demo-data/resources";
import store from "../redux/store";
import {
  postEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../redux/actions/eventActions";
import { useSelector } from "react-redux";
import { withFirebase } from "./Firebase";

const MainCalendar = (props) => {
  const appointments1 = useSelector((state) => state.data.events);
  console.log(appointments1);

  useEffect(() => {
    if (appointments1.length === 0) {
      store.dispatch(getEvents(props.firebase));
    }
  }, []);

  const [initValues, setInitValues] = useState({
    cathegoryId: "",
    endDate: "",
    members: "",
    rRule: "",
    startDate: "",
    title: "",
    notes: "",
    exDate: "",
    allDay: "",
  });

  const [state, setState] = useState({
    locale: "pt-BR",
    data: appointments1,
    resources: [
      {
        fieldName: "cathegoryId",
        title: "Categoria",
        instances: cathegoryData,
      },
      {
        fieldName: "members",
        title: "Participantes",
        instances: owners,
        allowMultiple: true,
      },
    ],
  });
  const handleCommitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const newEvent = {
        ...initValues,
        ...added,
      };
      console.log(newEvent);
      store.dispatch(postEvent(props.firebase, newEvent));
    }
    if (changed) {
      const eventId = Object.keys(changed)[0];
      const data = changed[Object.keys(changed)[0]];
      store.dispatch(updateEvent(props.firebase, data, eventId));
    }
    if (deleted) {
      store.dispatch(deleteEvent(props.firebase, deleted));
    }
  };
  return (
    <Paper>
      <Scheduler data={appointments1} locale={state.locale}>
        <ViewState defaultCurrentDate={Date.now()} />
        <EditingState onch onCommitChanges={handleCommitChanges} />
        <Toolbar />
        <DateNavigator />
        <EditRecurrenceMenu
          messages={{
            menuEditingTitle: "Aplicar actualização às repetições:",
            cancelButton: "Cancelar",
            commitButton: "Salvar",
            all: "Todos os eventos",
            current: "Apenas este",
            currentAndFollowing: "Este e os próximos",
            menuDeletingTitle: "Eliminar evento",
          }}
        />
        <MonthView />
        <AllDayPanel
          messages={{
            allDay: "Dias",
          }}
        />
        <Appointments />
        <AppointmentTooltip showOpenButton />
        <AppointmentForm
          messages={{
            detailsLabel: "Detalhes",
            titleLabel: "Titulo",
            allDayLabel: "Todo Dia",
            repeatLabel: "Repetir",
            moreInformationLabel: "Informação adicional",
            weekly: "Semanalmente",
            yearly: "Anualmente",
            daily: "Diariamente",
            repeatEveryLabel: "Repetir a cada",
            monthly: "Mensalmente",
            daysLabel: "Dia(s)",
            monthsLabel: "Meses",
            yearsLabel: "Ano(s)",
            weeksOnLabel: "",
            endRepeatLabel: "Terminar repetição",
            never: "Nunca",
            notesLabel: "Informação adicional do Evento.",
            onLabel: "Em",
            afterLabel: "Depois de",
            occurrencesLabel: "Repetições",
            ofEveryMonthLabel: "De cada mes",
          }}
        />
        <Resources data={state.resources} mainResourceName="cathegoryId" />
      </Scheduler>
    </Paper>
  );
};

export default withFirebase(MainCalendar);
