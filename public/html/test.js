<div className="modal fade" id="input-modal">
  <div className="modal-dialog" role="document">
    <div className="modal-content modal-content-demo">
      <div className="modal-header">
        <h6 className="modal-title">New message to @mdo</h6>
        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
            <input type="text" className="form-control" id="recipient-name" />
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Message:</label>
            <textarea className="form-control" id="message-text" defaultValue={""} />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button className="btn ripple btn-success" type="button">Save changes</button>
        <button className="btn ripple btn-danger" data-bs-dismiss="modal" type="button">Close</button>
      </div>
    </div>
  </div>
</div>
