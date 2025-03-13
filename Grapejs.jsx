import { useEffect, useState } from "react";
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";

const Grapejs = () => {
  const [editor, setEditor] = useState(null);
  const [previewHtml, setPreviewHtml] = useState("");

  useEffect(() => {
    if (editor) {
      editor.on("update", updatePreview);

      editor.on("component:selected", () => {
        console.log("Component selected:", editor.getSelected());
      });

      const domComponents = editor.DomComponents;

      //custom button
      domComponents.addType("custom-button", {
        model: {
          defaults: {
            tagName: "button",
            attributes: {
              class: "custom-button",
              style:
                "background: green; color: white; padding: 10px; border: none;",
            },
            content: "Click Me",
          },
        },
        view: {},
      });

      //custom email
      domComponents.addType("custom-email-template", {
        model: {
          defaults: {
            tagName: "div",
            attributes: {
              class: "email-template",
              style:
                "width: 100%; max-width: 600px; margin: auto; font-family: Arial, sans-serif;",
            },
            components: `
              <table style="width: 100%; border-collapse: collapse; background-color: #f8f8f8;">
                <tr>
                  <td style="padding: 20px; text-align: center; background-color: #4CAF50; color: white;">
                    <h1 style="margin: 0;">Welcome to Our Service</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <p>Hello [Recipient Name],</p>
                    <p>Thank you for joining us! We're excited to have you on board.</p>
                    <p>Here are some details about your account:</p>
                    <ul>
                      <li>Username: [Username]</li>
                      <li>Email: [Email]</li>
                    </ul>
                    <button style="background: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">Get Started</button>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; text-align: center; background-color: #f1f1f1;">
                    <p style="margin: 0; font-size: 12px; color: #555;"> 2023 Your Company. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            `,
          },
        },
        view: {
          // Custom view logic if needed
        },
      });

      //custom h2
      domComponents.addType("custom-heading", {
        model: {
          defaults: {
            tagName: "h2",
            attributes: { class: "custom-heading", style: "color: blue;" },
            content: "Custom Heading",
          },
        },
        view: {},
      });

      const blockManager = editor.BlockManager;

      blockManager.add("custom-button", {
        label: "Custom Button",
        content: { type: "custom-button" },
        category: "Custom Components",
      });

      blockManager.add("custom-heading", {
        label: "Custom Heading",
        content: { type: "custom-heading" },
        category: "Custom Components",
      });

      blockManager.add("custom-email-template", {
        label: "Custom-email-template",
        content: { type: "custom-email-template" },
        category: "Custom Components",
      });
    }
  }, [editor]);

  // Function to update preview
  const updatePreview = () => {
    if (editor) {
      const html = editor.getHtml();
      const css = editor.getCss();
      setPreviewHtml(`<style>${css}</style>${html}`);
    }
  };

  return (
    <div
      style={{ height: "100vh", width: "100vw", display: "flex", gap: "20px" }}
    >
      {/* Editor Section */}
      <div
        style={{
          height: "100%",
          width: "70%",
          flex: 1,
          border: "1px solid #ccc",
        }}
      >
        <StudioEditor
          options={{
            storageManager: false,
            project: {
              type: "email",
              default: {
                pages: [
                  {
                    name: "Email Template",
                  },
                ],
              },
            },
          }}
          onEditor={setEditor} // Store editor instance
        />
      </div>

      {/* Preview Section */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
        <iframe
          title="Email Preview"
          srcDoc={previewHtml}
          style={{ width: "100%", height: "500px", border: "none" }}
        />
      </div>
    </div>
  );
};

export default Grapejs;
