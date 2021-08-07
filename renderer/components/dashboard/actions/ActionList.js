import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDashboardContext } from "../DashboardContext";
import ActionItem from "./ActionListItem";

export default function ActionList({ Form: ActionForm }) {
  const { actions, addAction, reorderAction } = useDashboardContext();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    console.log(result.destination);

    console.log("Here");
    reorderAction(result.source.index, result.destination.index);
  };

  return (
    <Row>
      <Col sm="8" className="mx-2 mb-3 command-form">
        <Form.Label>Actions</Form.Label>
        <br />
        <Button onClick={() => addAction({})} className="mb-3">
          Add Action
        </Button>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" ignoreContainerClipping={true}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {actions.map((action, i) => (
                  <Draggable
                    key={"key-" + action.name + "-" + i}
                    draggableId={action.name + "-" + i}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={i}
                        index={i}
                      >
                        <ActionItem action={action} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Col>
    </Row>
  );
}
