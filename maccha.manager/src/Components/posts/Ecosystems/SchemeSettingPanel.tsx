import React, { useState } from "react";
import {
    Box,
    Button,
    Fab,
    Grid,
    Icon,
    IconButton,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import { Scheme, SchemeType, schemeTypeDisplayNames } from "../../../Models/Contents/Entities/Scheme";
import { PostType } from "../../../Models/posts/entities/PostType";
import { Flipper, Flipped } from "react-flip-toolkit";
import { v4 } from "uuid";
import { showFieldTypeEditDialogAsync } from "./FieldTypeEditDialog";
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from "react-sortable-hoc";
import { confirmAsync } from "../../commons/confirmAsync";
import { WrappedTextBlock } from "../../commons";

interface SchemeSettingPanelProps {
    postType: PostType;
    onChange: (scheme: PostType) => void;
}

/**
 * Provides scheme settings.
 * @param props props
 */
export function SchemeSettingPanel(props: SchemeSettingPanelProps) {
    const styles = useStyles();

    const { postType, onChange } = props;
    const [trigger, setTrigger] = useState(0);

    async function addScheme() {
        const edited = await showFieldTypeEditDialogAsync(new Scheme({
            schemeId: v4()
        }));
        if (!edited) {
            return;
        }

        props.onChange && props.onChange(
            props.postType.clone({
                taxonomy: props.postType.taxonomy.clone({
                    schemes: [
                        ...postType.taxonomy.schemes,
                        edited
                    ]
                })
            })
        );
        setTrigger(trigger + 1);
    }

    function handleChangeScheme(scheme: Scheme) {
        const schemes = postType.taxonomy.schemes;
        const _scheme = schemes.find(s => s.schemeId === scheme.schemeId);
        if (_scheme) {
            const i = schemes.indexOf(_scheme);
            schemes[i] = scheme;
            props.onChange && props.onChange(
                props.postType.clone({
                    taxonomy: props.postType.taxonomy.clone({
                        schemes: [
                            ...schemes,
                        ]
                    })
                })
            );
        }
    }

    function handleSortScheme(from: number, to: number) {
        props.onChange && props.onChange(
            props.postType.clone({
                taxonomy: props.postType.taxonomy.clone({
                    schemes: arrayMove(postType.taxonomy.schemes, from, to)
                })
            })
        );
    }

    async function handleChangeFieldType(scheme: Scheme) {
        const edited = await showFieldTypeEditDialogAsync(scheme);
        if (!edited) {
            return;
        }

        const schemes = postType.taxonomy.schemes;
        const _scheme = schemes.find(s => s.schemeId === edited.schemeId);

        if (_scheme) {
            const i = schemes.indexOf(_scheme);
            schemes[i] = edited;
            props.onChange && props.onChange(
                props.postType.clone({
                    taxonomy: props.postType.taxonomy.clone({
                        schemes: [
                            ...schemes,
                        ]
                    })
                })
            );
        }
    }

    async function handleDelete(scheme: Scheme, i: number) {
        if (!await confirmAsync("フィールドを削除しますか？")) {
            return;
        }

        props.onChange && props.onChange(
            props.postType.clone({
                taxonomy: props
                    .postType
                    .taxonomy
                    .clone({
                        schemes: [
                            ...postType
                                .taxonomy
                                .schemes
                                .filter(s => s !== scheme)
                        ]
                    })
            })
        );
        setTrigger(trigger + 1);
    }

    const SortableItem = SortableElement(
        (props: {
            value: Scheme,
            sortIndex: number,
            deleteHandler: (scheme: Scheme, index: number) => void,
            changeFieldTypeHandler: (scheme: Scheme) => void,
            changeSchemeHandler: (scheme: Scheme) => void
        }) =>
            <Flipped
                flipId={props.value.schemeId}
                translate
            >
                <div style={{ padding: "4px" }}>
                    <SchemeItem
                        scheme={props.value}
                        deletePresssed={() => props.deleteHandler(props.value, props.sortIndex)}
                        editPressed={() => props.changeFieldTypeHandler(props.value)}
                        onChange={s => props.changeSchemeHandler(s)}
                    />
                </div>
            </Flipped>
    );

    const SortableList = SortableContainer(
        (props: {
            items: Scheme[],
            trigger: Number,
            deleteHandler: (scheme: Scheme, index: number) => void,
            changeFieldTypeHandler: (scheme: Scheme) => void,
            changeSchemeHandler: (scheme: Scheme) => void
        }) =>
            (
                <Flipper
                    flipKey={`key_${props.trigger}`}
                >
                    {
                        props.items.map(
                            (s: Scheme, i: number) => (
                                <SortableItem
                                    key={`item-${s.schemeId}`} index={i}
                                    sortIndex={i}
                                    value={s}
                                    deleteHandler={(s, i) => props.deleteHandler(s, i)}
                                    changeFieldTypeHandler={s => props.changeFieldTypeHandler(s)}
                                    changeSchemeHandler={s => props.changeSchemeHandler(s)}
                                />
                            )
                        )
                    }
                </Flipper>
            )
    );

    return (
        <>
            <Box
                mt={6}
                display="flex"
                flexDirection="column"
                maxWidth="960px"
                width="100%"
            >
                <Typography variant="h6" >APIスキーム</Typography>
                <Typography color="textSecondary" variant="caption" >
                    管理するコンテンツのスキームを定義します。
                </Typography>
                <SortableList
                    trigger={trigger}
                    useDragHandle
                    items={postType.taxonomy.schemes}
                    onSortEnd={({ oldIndex, newIndex }) => handleSortScheme(oldIndex, newIndex)}
                    deleteHandler={(s, i) => handleDelete(s, i)}
                    changeFieldTypeHandler={s => handleChangeFieldType(s)}
                    changeSchemeHandler={s => handleChangeScheme(s)}
                />
                <Box mt={3} />
                <Button onClick={addScheme}>
                    <Icon>add</Icon>
                        スキームを追加
                </Button>
            </Box>
        </>
    );
}

interface SchemeItemProps {
    scheme: Scheme;
    onChange: (s: Scheme) => void;
    deletePresssed: () => void;
    editPressed: () => void;
}

const DragHandle = SortableHandle(() => <Box
    style={{ cursor: "pointer" }}
    width="40px"
    display="flex"
    alignItems="center"
>
    <Icon fontSize="small">reorder</Icon>
</Box>);

/**
 * for a scheme editing.
 * @param props props
 */
function SchemeItem(props: SchemeItemProps) {
    function handlePropertyChanged(key: keyof Scheme, value: unknown) {
        props.onChange(
            props.scheme.clone({
                [key]: value
            })
        );
    }

    return (
        <Paper style={{ padding: "8px" }}>
            <Box display="flex">
                <DragHandle />
                <Box flex="1 1 auto" overflow="hidden">
                    <Grid container>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box p={1}>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    noWrap>フィールド名</Typography>
                                <Box mt={1} />
                                <Typography
                                    color="primary"
                                    noWrap>{props.scheme.name}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box p={1}>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    noWrap>表示名</Typography>
                                <Box mt={1} />
                                <Typography
                                    color="primary"
                                    noWrap>{props.scheme.displayName}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box p={1}>
                                <Typography variant="caption"
                                    color="textSecondary"
                                    noWrap>備考</Typography>
                                <Box mt={1} />
                                <WrappedTextBlock
                                    color="textSecondary"
                                    row={3}
                                    variant="caption"
                                    fontSize="12px"
                                >
                                    {props.scheme.description}
                                </WrappedTextBlock>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box p={1}>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    noWrap
                                >
                                    フィールドタイプ
                                </Typography>
                                <Box mt={1} />
                                <Typography
                                    color="primary"
                                    noWrap>{schemeTypeDisplayNames[props.scheme.type]}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box width="60px" display="flex" alignItems="center" justifyContent="flex-end">
                    <IconButton
                        onClick={props.editPressed}
                        size="small"
                        color="primary"
                    >
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                        onClick={props.deletePresssed}
                        size="small"
                        color="primary"
                    >
                        <Icon>delete</Icon>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}

const useStyles = makeStyles({
    itemTitle: {
        width: "320px"
    }
});