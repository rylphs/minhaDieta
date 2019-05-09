exports.execute = async(args) => {
    const vscode = args.require("vscode");

    //vscode.window.showInformationMessage(curr.document.fileName);
    vscode.workspace.openTextDocument(vscode.workspace.rootPath + "/docs/classes/diario.yuml").then(
        (val) => {
            vscode.window.showTextDocument(val).then((b) => {
                vscode.commands.executeCommand("extension.viewYumlDiagram").then((c) => {
                        vscode.window.activeTextEditor.hide();
                    },
                    (val) => vscode.window.showInformationMessage(val));
            });
        },
        (val) => vscode.window.showInformationMessage(val),
    );
}